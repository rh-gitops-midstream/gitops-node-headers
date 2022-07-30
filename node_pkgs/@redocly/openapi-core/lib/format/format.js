"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProblems = exports.getTotals = void 0;
const path = require("path");
const colorette_1 = require("colorette");
const coreVersion = require('../../package.json').version;
const codeframes_1 = require("./codeframes");
const ERROR_MESSAGE = {
    INVALID_SEVERITY_LEVEL: 'Invalid severity level; accepted values: error or warn',
};
const BG_COLORS = {
    warn: (str) => colorette_1.bgYellow(colorette_1.black(str)),
    error: colorette_1.bgRed,
};
const COLORS = {
    warn: colorette_1.yellow,
    error: colorette_1.red,
};
const SEVERITY_NAMES = {
    warn: 'Warning',
    error: 'Error',
};
const MAX_SUGGEST = 5;
function severityToNumber(severity) {
    return severity === 'error' ? 1 : 2;
}
function getTotals(problems) {
    let errors = 0;
    let warnings = 0;
    let ignored = 0;
    for (const m of problems) {
        if (m.ignored) {
            ignored++;
            continue;
        }
        if (m.severity === 'error')
            errors++;
        if (m.severity === 'warn')
            warnings++;
    }
    return {
        errors,
        warnings,
        ignored,
    };
}
exports.getTotals = getTotals;
function formatProblems(problems, opts) {
    const { maxProblems = 100, cwd = process.cwd(), format = 'codeframe', color = colorette_1.options.enabled, totals = getTotals(problems), version = coreVersion, } = opts;
    colorette_1.options.enabled = color; // force colors if specified
    const totalProblems = problems.length;
    problems = problems.filter((m) => !m.ignored);
    const ignoredProblems = totalProblems - problems.length;
    problems = problems
        .sort((a, b) => severityToNumber(a.severity) - severityToNumber(b.severity))
        .slice(0, maxProblems);
    if (!totalProblems && format !== 'json')
        return;
    switch (format) {
        case 'json':
            outputJSON();
            break;
        case 'codeframe':
            for (let i = 0; i < problems.length; i++) {
                const problem = problems[i];
                process.stderr.write(`${formatCodeframe(problem, i)}\n`);
            }
            break;
        case 'stylish': {
            const groupedByFile = groupByFiles(problems);
            for (const [file, { ruleIdPad, locationPad: positionPad, fileProblems }] of Object.entries(groupedByFile)) {
                process.stderr.write(`${colorette_1.blue(path.relative(cwd, file))}:\n`);
                for (let i = 0; i < fileProblems.length; i++) {
                    const problem = fileProblems[i];
                    process.stderr.write(`${formatStylish(problem, positionPad, ruleIdPad)}\n`);
                }
                process.stderr.write('\n');
            }
            break;
        }
        case 'checkstyle': {
            const groupedByFile = groupByFiles(problems);
            process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>\n');
            process.stdout.write('<checkstyle version="4.3">\n');
            for (const [file, { fileProblems }] of Object.entries(groupedByFile)) {
                process.stdout.write(`<file name="${xmlEscape(path.relative(cwd, file))}">\n`);
                fileProblems.forEach(formatCheckstyle);
                process.stdout.write(`</file>\n`);
            }
            process.stdout.write(`</checkstyle>\n`);
            break;
        }
    }
    if (totalProblems - ignoredProblems > maxProblems) {
        process.stderr.write(`< ... ${totalProblems - maxProblems} more problems hidden > ${colorette_1.gray('increase with `--max-problems N`')}\n`);
    }
    function outputJSON() {
        const resultObject = {
            totals,
            version,
            problems: problems.map((p) => {
                var _a;
                let problem = Object.assign(Object.assign({}, p), { location: p.location.map((location) => (Object.assign(Object.assign({}, location), { source: {
                            ref: path.relative(cwd, location.source.absoluteRef),
                        } }))), from: p.from
                        ? Object.assign(Object.assign({}, p.from), { source: {
                                ref: path.relative(cwd, ((_a = p.from) === null || _a === void 0 ? void 0 : _a.source.absoluteRef) || cwd),
                            } }) : undefined });
                if (process.env.FORMAT_JSON_WITH_CODEFRAMES) {
                    const location = p.location[0]; // TODO: support multiple locations
                    const loc = codeframes_1.getLineColLocation(location);
                    problem.codeframe = codeframes_1.getCodeframe(loc, color);
                }
                return problem;
            }),
        };
        process.stdout.write(JSON.stringify(resultObject, null, 2));
    }
    function getBgColor(problem) {
        const { severity } = problem;
        if (!BG_COLORS[severity]) {
            throw new Error(ERROR_MESSAGE.INVALID_SEVERITY_LEVEL);
        }
        return BG_COLORS[severity];
    }
    function formatCodeframe(problem, idx) {
        const bgColor = getBgColor(problem);
        const location = problem.location[0]; // TODO: support multiple locations
        const relativePath = path.relative(cwd, location.source.absoluteRef);
        const loc = codeframes_1.getLineColLocation(location);
        const atPointer = location.pointer ? colorette_1.gray(`at ${location.pointer}`) : '';
        const fileWithLoc = `${relativePath}:${loc.start.line}:${loc.start.col}`;
        return (`[${idx + 1}] ${bgColor(fileWithLoc)} ${atPointer}\n\n` +
            `${problem.message}\n\n` +
            formatDidYouMean(problem) +
            codeframes_1.getCodeframe(loc, color) +
            '\n\n' +
            formatFrom(cwd, problem.from) +
            `${SEVERITY_NAMES[problem.severity]} was generated by the ${colorette_1.blue(problem.ruleId)} rule.\n\n`);
    }
    function formatStylish(problem, locationPad, ruleIdPad) {
        const color = COLORS[problem.severity];
        const severityName = color(SEVERITY_NAMES[problem.severity].toLowerCase().padEnd(7));
        const { start } = problem.location[0];
        return `  ${`${start.line}:${start.col}`.padEnd(locationPad)}  ${severityName}  ${problem.ruleId.padEnd(ruleIdPad)}  ${problem.message}`;
    }
    function formatCheckstyle(problem) {
        const { line, col } = problem.location[0].start;
        const severity = problem.severity == 'warn' ? 'warning' : 'error';
        const message = xmlEscape(problem.message);
        const source = xmlEscape(problem.ruleId);
        process.stdout.write(`<error line="${line}" column="${col}" severity="${severity}" message="${message}" source="${source}" />\n`);
    }
}
exports.formatProblems = formatProblems;
function formatFrom(cwd, location) {
    if (!location)
        return '';
    const relativePath = path.relative(cwd, location.source.absoluteRef);
    const loc = codeframes_1.getLineColLocation(location);
    const fileWithLoc = `${relativePath}:${loc.start.line}:${loc.start.col}`;
    return `referenced from ${colorette_1.blue(fileWithLoc)}\n\n`;
}
function formatDidYouMean(problem) {
    if (problem.suggest.length === 0)
        return '';
    if (problem.suggest.length === 1) {
        return `Did you mean: ${problem.suggest[0]} ?\n\n`;
    }
    else {
        return `Did you mean:\n  - ${problem.suggest.slice(0, MAX_SUGGEST).join('\n  - ')}\n\n`;
    }
}
const groupByFiles = (problems) => {
    const fileGroups = {};
    for (const problem of problems) {
        const absoluteRef = problem.location[0].source.absoluteRef; // TODO: multiple errors
        fileGroups[absoluteRef] = fileGroups[absoluteRef] || {
            fileProblems: [],
            ruleIdPad: 0,
            locationPad: 0,
        };
        const mappedProblem = Object.assign(Object.assign({}, problem), { location: problem.location.map(codeframes_1.getLineColLocation) });
        fileGroups[absoluteRef].fileProblems.push(mappedProblem);
        fileGroups[absoluteRef].ruleIdPad = Math.max(problem.ruleId.length, fileGroups[absoluteRef].ruleIdPad);
        fileGroups[absoluteRef].locationPad = Math.max(Math.max(...mappedProblem.location.map((loc) => `${loc.start.line}:${loc.start.col}`.length)), fileGroups[absoluteRef].locationPad);
    }
    return fileGroups;
};
function xmlEscape(s) {
    return s.replace(/[<>&"'\x00-\x1F\x7F\u0080-\uFFFF]/gu, (char) => {
        switch (char) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '"':
                return '&quot;';
            case "'":
                return '&apos;';
            default:
                return `&#${char.charCodeAt(0)};`;
        }
    });
}
