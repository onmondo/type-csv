import { MatchReader, WinsAnalysis } from './service/FootballService';
import { Schema } from './model/FootballModel'
import { Summary, ConsoleReport, HtmlReport } from './service/ReportService';

const footballMatch = new MatchReader('football', 'document/football.csv');
const csvContents = footballMatch.read();
const matches = footballMatch.mapRow(csvContents);
footballMatch.toString();

const collection: Schema[] = matches;

// const analyzer = new WinsAnalysis('Man United');
// const report = new ConsoleReport();
// const report = new HtmlReport('report');
// const summary = new Summary(analyzer, report);

const summary = Summary.winsAnalysisWithHtmlReport('Man United');
summary.buildAndReport(collection);