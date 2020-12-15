import fs from 'fs';
import { WinsAnalysis } from './FootballService';

export interface Analyzer<Schema> {
    run(matches: Schema[]): string;
}

export interface OutputTarget {
    print(report: string): void;
}

export class ConsoleReport implements OutputTarget {
    print(report: string): void {
        console.log(report);
    }
}

export class HtmlReport implements OutputTarget {
    constructor(public fileName: string) {}

    print(report: string): void {
        const html = `
            <div>
                <h1>Analysis Output</h1>
                <div>${report}</div>
            </div>
        `;

        fs.writeFileSync(`document/${this.fileName}.html`, html);
    }
}

export class Summary<Schema> {
    constructor(public analyzer: Analyzer<Schema>, public outputTarget: OutputTarget) {}

    static winsAnalysisWithHtmlReport(team: string): Summary {
        return new Summary(
            new WinsAnalysis(team),
            new HtmlReport('report')
        )
    }

    buildAndReport(collection: Schema[]): void {
        const output = this.analyzer.run(collection);
        this.outputTarget.print(output);
    }
}
