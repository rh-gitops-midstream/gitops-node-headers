declare const defaultTheme: ThemeInterface;
export default defaultTheme;
export declare function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface;
export interface ColorSetting {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}
export interface HTTPResponseColos {
    color: string;
    backgroundColor: string;
    tabTextColor: string;
}
export interface FontSettings {
    fontSize: string;
    fontWeight: string;
    fontFamily: string;
    lineHeight: string;
    color: string;
}
export interface ResolvedThemeInterface {
    spacing: {
        unit: number;
        sectionHorizontal: number;
        sectionVertical: number;
    };
    breakpoints: {
        small: string;
        medium: string;
        large: string;
    };
    colors: {
        tonalOffset: number;
        primary: ColorSetting;
        success: ColorSetting;
        warning: ColorSetting;
        error: ColorSetting;
        gray: {
            50: string;
            100: string;
        };
        border: {
            light: string;
            dark: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        responses: {
            success: HTTPResponseColos;
            error: HTTPResponseColos;
            redirect: HTTPResponseColos;
            info: HTTPResponseColos;
        };
        http: {
            get: string;
            post: string;
            put: string;
            options: string;
            patch: string;
            delete: string;
            basic: string;
            link: string;
            head: string;
        };
    };
    schema: {
        linesColor: string;
        defaultDetailsWidth: string;
        typeNameColor: string;
        typeTitleColor: string;
        requireLabelColor: string;
        labelsTextSize: string;
        nestingSpacing: string;
        nestedBackground: string;
        arrow: {
            size: string;
            color: string;
        };
    };
    typography: {
        fontSize: string;
        lineHeight: string;
        fontWeightLight: string;
        fontWeightRegular: string;
        fontWeightBold: string;
        fontFamily: string;
        smoothing: string;
        optimizeSpeed: boolean;
        code: FontSettings & {
            backgroundColor: string;
            wrap: boolean;
        };
        headings: {
            fontFamily: string;
            fontWeight: string;
            lineHeight: string;
        };
        links: {
            color: string;
            visited: string;
            hover: string;
        };
    };
    sidebar: {
        width: string;
        backgroundColor: string;
        textColor: string;
        activeTextColor: string;
        groupItems: {
            textTransform: string;
        };
        level1Items: {
            textTransform: string;
        };
        arrow: {
            size: string;
            color: string;
        };
    };
    logo: {
        maxHeight: string;
        maxWidth: string;
        gutter: string;
    };
    rightPanel: {
        backgroundColor: string;
        textColor: string;
        width: string;
    };
    codeBlock: {
        backgroundColor: string;
    };
    extensionsHook?: (name: string, props: any) => string;
}
export declare type primitive = string | number | boolean | undefined | null;
export declare type AdvancedThemeDeep<T> = T extends primitive ? T | ((theme: ResolvedThemeInterface) => T) : AdvancedThemeObject<T>;
export declare type AdvancedThemeObject<T> = {
    [P in keyof T]?: AdvancedThemeDeep<T[P]>;
};
export declare type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;
