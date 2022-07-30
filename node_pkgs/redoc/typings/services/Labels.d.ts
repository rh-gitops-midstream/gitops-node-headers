export interface LabelsConfig {
    enum: string;
    enumSingleValue: string;
    enumArray: string;
    default: string;
    deprecated: string;
    example: string;
    examples: string;
    recursive: string;
    arrayOf: string;
    webhook: string;
    const: string;
    noResultsFound: string;
    download: string;
    downloadSpecification: string;
    responses: string;
    callbackResponses: string;
    requestSamples: string;
    responseSamples: string;
}
export declare type LabelsConfigRaw = Partial<LabelsConfig>;
export declare function setRedocLabels(_labels?: LabelsConfigRaw): void;
export declare function l(key: keyof LabelsConfig, idx?: number): string;
