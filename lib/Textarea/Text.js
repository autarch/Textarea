Textarea = function (textarea) {
    if ( textarea.tagName != "TEXTAREA" ) {
        throw "Textarea.js requires a textarea as its constructor argument";
    }

    this.textarea = textarea;
};

/* IE and Opera */
if ( document.selection && document.selection.createRange ) {
    Textarea.prototype.selectedText = function () {
        var text = document.selection.createRange().text;

        if ( typeof text == "undefined" ) {
            return "";
        }

        return text;
    };

    Textarea.prototype.replaceOrInsertText = function (text) {
        document.selection.createRange().text = text;

        this.textarea.caretPos = document.selection.createRange().duplicate();
    };
}
/* Firefox, Safari, and others */
else {
    Textarea.prototype.selectedText = function () {
        var start = this.textarea.selectionStart;
        var end = this.textarea.selectionEnd;

        var text = this.textarea.value.substring( start, end );

        if ( typeof text == "undefined" ) {
            return "";
        }

        return text;
    };

    Textarea.prototype.replaceOrInsertText = function (text) {
        var start = this.textarea.selectionStart;
        var end = this.textarea.selectionEnd;

        var scroll = this.textarea.scrollTop;

        this.textarea.value =
            this.textarea.value.substring( 0, start )
            + text
            + this.textarea.value.substring( end, this.textarea.value.length );

        this.textarea.focus();

        this.textarea.selectionStart = start + text.length;
        this.textarea.selectionEnd = start + text.length;
        this.textarea.scrollTop = scroll;
    };
}
