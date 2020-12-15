import { MatchReader, WinsAnalysis } from './service/FootballService';
import { Schema } from './model/FootballModel'
import { Summary, ConsoleReport, HtmlReport } from './service/ReportService';
import { ArrayOfNumbers, ArrayOfStrings, ArrayOfSomething } from './developer/generics';

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


const numberCollection = [1, 2, 3, 4];
const stringCollection = ['s', 'y', 'r'];

// const listOfNumbers = new ArrayOfNumbers(numberCollection);
// console.log(listOfNumbers.get(3));

// const listOfStrings = new ArrayOfStrings(stringCollection);
// console.log(listOfStrings.get(2));

const listOfAny = new ArrayOfSomething(numberCollection);
console.log(listOfAny.get(2));

// example of generics with function
function printAnything<T>(anyCollection: T[]): void {
    anyCollection.forEach((item) => {
        console.log(item);
    });
}

printAnything(stringCollection);