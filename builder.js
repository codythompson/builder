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

    this.insert = function(elesToInsert, path, beforeIntoAfter) {
        var insertFunc;
        if (beforeIntoAfter < 0) {
            insertFunc = this.insertBefore;
        }
        else if (beforeIntoAfter > 0) {
            insertFunc = this.insertAfter;
        }
        else {
            insertFunc = this.insertInto;
        }
        insertFunc(elestoInsert, path);
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
}
