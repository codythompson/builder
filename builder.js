var _BUILDER_ = function (templateEle) {

    this.templateEle = templateEle;

    this.getElementAt = function(path) {
        if (path === null || !(path instanceof Array) ||
                path.length === 0) {
            return null;
        }

        var cur = $(this.templateEle);
        var children = cur.children();
        for (var i = 0; i < path.length; i++) {
            cur = $(children[path[i]]);
            children = cur.children();
        }

        return cur[0];
    }

    this.insertBefore = function(elesToInsert, path) {
        if (path === null || !(path instanceof Array) ||
                path.length == 0 || !(elesToInsert instanceof Array) ||
                    elesToInsert.length == 0) {
            return null;
        }

        $(this.getElementAt(path)).before(elesToInsert[0]);
        var afterEle = $(elesToInsert[0]);

        for (var i = 1; i < elesToInsert.length; i++) {
            afterEle.after(elesToInsert[i]);
            afterEle = $(elesToInsert[i]);
        }
    }

    this.insertInto = function (elesToInsert, path) {
        if (path === null || !(path instanceof Array) ||
                path.length == 0 || !(elesToInsert instanceof Array) ||
                    elesToInsert.length == 0) {
            return null;
        }

        var baseEle = this.getElementAt(path);
        baseEle = $(baseEle);
        for (var i = 0; i < elesToInsert.length; i++) {
            baseEle.append(elesToInsert[i]);
        }
    }

    this.insertAfter = function(elesToInsert, path) {
        if (path === null || !(path instanceof Array) ||
                path.length == 0 || !(elesToInsert instanceof Array) ||
                    elesToInsert.length == 0) {
            return null;
        }

        var afterEle = $(this.getElementAt(path));

        for (var j = 0; j < elesToInsert.length; j++) {
            afterEle.after(elesToInsert[j]);
            afterEle = $(elesToInsert[j]);
        }
    }

    this.buildEles = function (templatePath, textContPath, text) {
        if (text instanceof Array) {
            if (text.length == 0) {
                return null;
            } else if (text.length == 1) {
                this.buildEles(templatePath, textContPath, text[0]);
            }

            for (var i = text.length - 1; i > 0; i--) {
                var nextEle = this.getElementAt(templatePath);
                nextEle = $(nextEle).clone();

                var textNode = document.createTextNode(text[i]);
                this.insertInto([textNode], textContPath);

                this.insertBefore([nextEle], templatePath);
            }
            var textNode = document.createTextNode(text[0]);
            this.insertInto([textNode], textContPath);
        } else {
            var textNode = document.createTextNode(text);
            this.insertInto([textNode], textContPath);
        }
    }
}
