module.exports = function keya(api) {



    /**
     * Gets a document from the store
     * @param {String} doc Document Name
     * @return {Promise<Object|undefined>} The document object, returns undefined if no document has that name
     */
    function get(doc) {
        return api.resolve(doc);
    }

    /**
     * Sets a document's value in the store. 
     * @param {String} doc Document Name
     * @param {Object} value JSON object to set the document to store
     * @returns {Promise} Resolves if the operation was successful. Fails with the outputted error code otherwise 
     */
    function set(doc, value) {
        return api.store(doc, value);
    }

    /**
     * Checks for the existance of a document
     * @param {String} doc Document Name
     * @returns {Promise<Boolean>} Does the document exist
     */
    function has(doc) {
        return api.resolve(doc)
            .then(() => resolve(true))
            .catch(() => resolve(false))
    }

    return {
        get,
        set,
        has,
        list: api.list
    }
} 