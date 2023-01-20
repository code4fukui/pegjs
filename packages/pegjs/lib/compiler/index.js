import { calcReportFailures } from "./passes/calc-report-failures.js";
import { generateBytecode } from "./passes/generate-bytecode.js";
import { generateJS } from "./passes/generate-js.js";
import { removeProxyRules } from "./passes/remove-proxy-rules.js";
import { reportDuplicateLabels } from "./passes/report-duplicate-labels.js";
import { reportDuplicateRules } from "./passes/report-duplicate-rules.js";
import { reportUnusedRules } from "./passes/report-unused-rules.js";
import { reportInfiniteRecursion } from "./passes/report-infinite-recursion.js";
import { reportInfiniteRepetition } from "./passes/report-infinite-repetition.js";
import { reportUndefinedRules } from "./passes/report-undefined-rules.js";
import { inferenceMatchResult } from "./passes/inference-match-result.js";
import { reportIncorrectPlucking } from "./passes/report-incorrect-plucking.js";
import { Session } from "./session.js";
import util from "../util/index.js";

export const compiler = {

    Session: Session,

    // Compiler passes.
    //
    // Each pass is a function that is passed the AST. It can perform checks on it
    // or modify it as needed. If the pass encounters a semantic error, it throws
    // |peg.GrammarError|.
    passes: {
        check: {
            reportUndefinedRules: reportUndefinedRules,
            reportDuplicateRules: reportDuplicateRules,
            reportUnusedRules: reportUnusedRules,
            reportDuplicateLabels: reportDuplicateLabels,
            reportInfiniteRecursion: reportInfiniteRecursion,
            reportInfiniteRepetition: reportInfiniteRepetition,
            reportIncorrectPlucking: reportIncorrectPlucking,
        },
        transform: {
            removeProxyRules: removeProxyRules,
        },
        generate: {
            calcReportFailures: calcReportFailures,
            inferenceMatchResult: inferenceMatchResult,
            generateBytecode: generateBytecode,
            generateJS: generateJS,
        },
    },

    // Generates a parser from a specified grammar AST. Throws |peg.GrammarError|
    // if the AST contains a semantic error. Note that not all errors are detected
    // during the generation and some may protrude to the generated parser and
    // cause its malfunction.
    compile( ast, session, options = {} ) {

        options = util.processOptions( options, {
            allowedStartRules: [ ast.rules[ 0 ].name ],
            cache: false,
            context: {},
            dependencies: {},
            exportVar: null,
            features: null,
            format: "bare",
            header: null,
            optimize: "speed",
            output: "parser",
            trace: false,
        } );

        // We want `session.vm.evalModule` to return the parser
        if ( options.output === "parser" ) options.format = "umd";

        util.each( session.passes, stage => {

            stage.forEach( pass => {

                pass( ast, session, options );

            } );

        } );

        switch ( options.output ) {

            case "parser":
                return session.vm.evalModule( ast.code, options.context );

            case "source":
                return ast.code;

            default:
                session.error( `Invalid output format: ${ options.output }.` );

        }

    },

};
