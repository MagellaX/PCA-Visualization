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
exports.LTFCompletionProvider = void 0;
const vscode_1 = require("vscode");
const VARIABLES = [
    { name: "File", description: "The current file name." },
    { name: "Path", description: "The full path of the current file." },
    { name: "CurrentYear", description: "The current year number." },
    { name: "CurrentMonth", description: "The current month number." },
    { name: "CurrentDay", description: "The current day of the month number." },
    { name: "CurrentDate", description: "The current date as string." },
    { name: "CreationYear", description: "The file creation year number." },
    { name: "CreationMonth", description: "The file creation month number." },
    { name: "CreationDay", description: "The file creation day of the month number." },
    { name: "CreationDate", description: "The file creation date as string." },
    { name: "Username", description: "The name of the current user on the OS." },
    { name: "LineContent", description: "Remaining content of the current line starting at the position of this token." }
];
class LTFCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const range = document.getWordRangeAtPosition(position, /{[A-z]+}/);
        if (!range) {
            return VARIABLES.map(v => {
                return {
                    label: `{${v.name}}`,
                    kind: vscode_1.CompletionItemKind.Variable,
                    detail: v.description
                };
            });
        }
        const text = document.getText(range);
        const match = text.match(/({)([A-z]+)(})/);
        if (!match) {
            return VARIABLES.map(v => {
                return {
                    label: v.name,
                    kind: vscode_1.CompletionItemKind.Variable,
                    detail: v.description
                };
            });
        }
        const name = match[2];
        return VARIABLES.filter(v => v.name.toLowerCase().includes(name.toLowerCase())).map(v => {
            return {
                label: v.name,
                kind: vscode_1.CompletionItemKind.Variable,
                detail: v.description
            };
        });
    }
}
exports.LTFCompletionProvider = LTFCompletionProvider;
//# sourceMappingURL=completion.js.map