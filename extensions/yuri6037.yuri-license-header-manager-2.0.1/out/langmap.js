"use strict";
/*
 * Copyright 2023 Yuri6037
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS
 * IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangMap = void 0;
const vscode_1 = require("vscode");
const C_MULTILINE_CONFIG = {
    reserved: null,
    startComment: "/*",
    middleComment: " * ",
    endComment: " */"
};
const C_DEFAULT_CONFIG = {
    multiLine: C_MULTILINE_CONFIG,
    singleLine: {
        reserved: null,
        startComment: null,
        middleComment: "// ",
        endComment: ""
    }
};
const LUA_DEFAULT_CONFIG = {
    multiLine: {
        reserved: null,
        startComment: "--[[",
        middleComment: null,
        endComment: "]]--"
    },
    singleLine: {
        reserved: null,
        startComment: null,
        middleComment: "-- ",
        endComment: ""
    }
};
const TOML_DEFAULT_CONFIG = {
    multiLine: null,
    singleLine: {
        reserved: null,
        startComment: null,
        middleComment: "# ",
        endComment: ""
    }
};
const SHELL_DEFAULT_CONFIG = {
    multiLine: null,
    singleLine: {
        reserved: {
            regex: /#!.*/m,
            numLines: 1
        },
        startComment: null,
        middleComment: "# ",
        endComment: ""
    }
};
const XML_DEFAULT_CONFIG = {
    multiLine: {
        reserved: {
            regex: /<\?xml .*\?>/m,
            numLines: 1
        },
        startComment: "<!--",
        middleComment: null,
        endComment: "-->"
    },
    singleLine: null
};
const DEFAULT_CONFIGS = {
    "cpp": C_DEFAULT_CONFIG,
    "hpp": C_DEFAULT_CONFIG,
    "hxx": C_DEFAULT_CONFIG,
    "cxx": C_DEFAULT_CONFIG,
    "hh": C_DEFAULT_CONFIG,
    "cc": C_DEFAULT_CONFIG,
    "h": C_DEFAULT_CONFIG,
    "c": C_DEFAULT_CONFIG,
    "rs": C_DEFAULT_CONFIG,
    "java": C_DEFAULT_CONFIG,
    "swift": C_DEFAULT_CONFIG,
    "toml": TOML_DEFAULT_CONFIG,
    "py": TOML_DEFAULT_CONFIG,
    "sh": SHELL_DEFAULT_CONFIG,
    "bash": SHELL_DEFAULT_CONFIG,
    "xml": XML_DEFAULT_CONFIG,
    "html": XML_DEFAULT_CONFIG,
    "css": {
        singleLine: null,
        multiLine: C_MULTILINE_CONFIG
    },
    "js": C_DEFAULT_CONFIG,
    "ts": C_DEFAULT_CONFIG,
    //ReactJS specific.
    "jsx": C_DEFAULT_CONFIG,
    "tsx": C_DEFAULT_CONFIG,
    "lua": LUA_DEFAULT_CONFIG
};
/**
 * The language configuration map.
 */
class LangMap {
    constructor(uri) {
        this.overrides = {};
        const config = vscode_1.workspace.getConfiguration("yuri-license-header-manager", uri);
        const disabled = config.get("disabledLanguages");
        const entries = config.get("languages");
        if (entries) {
            for (const entry of entries) {
                for (const ext of entry.extensions) {
                    const conf = {
                        startComment: entry.startComment,
                        endComment: entry.endComment,
                        middleComment: entry.middleComment,
                        reserved: null
                    };
                    if (entry.reserved) {
                        conf.reserved = {
                            numLines: entry.reserved.numLines,
                            regex: new RegExp(entry.reserved.regex.pattern, entry.reserved.regex.flags)
                        };
                    }
                    this.overrides[ext] = conf;
                }
            }
        }
        if (disabled) {
            for (const entry of disabled) {
                this.overrides[entry] = null;
            }
        }
        this.singleLine = config.get("singleLineComments") ?? false;
    }
    getConfig(ext) {
        if (ext in this.overrides) {
            return this.overrides[ext];
        }
        if (ext in DEFAULT_CONFIGS) {
            const conf = DEFAULT_CONFIGS[ext];
            if (this.singleLine && conf.singleLine) {
                return conf.singleLine;
            }
            else {
                return conf.multiLine ?? conf.singleLine;
            }
        }
        return undefined;
    }
}
exports.LangMap = LangMap;
//# sourceMappingURL=langmap.js.map