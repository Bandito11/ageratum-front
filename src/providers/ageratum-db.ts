const db = 'TODO: Loki logic goes here';

export function createDB() { }

export function findOne(id) {
    // Will be deleted when Loki is implemented
    return true
}
export function insertArticle(article: IBlog) {
    let response: IResponse<string> = {
        success: false,
        error: null,
        data: undefined,
        dateStamp: new Date()
    }
    const found = findOne(article.id); //Will use Loki core Find Method.
    if (!found) {
        try {
            //TODO: 
            // Insert article into DB
            response = {
                ...response,
                success: true,
                data: 'Article was saved successfully!'
            }
            return response;

        } catch (error) {
            // There was an error on LokiJS
            response = {
                ...response,
                error: error
            }
            return response;
        }
    } else {
        response = {
            ...response,
            error: 'Article was found on Local DB!'
        }
        return response;
    }
}

export function updateArticle(article: IBlog) {
    let response: IResponse<string> = {
        success: false,
        error: null,
        data: undefined,
        dateStamp: new Date()
    }
    const found = findOne(article.id); //Will use Loki methods to find if Article is on DB
    if (found) {
        try {
            //TODO: 
            // Update article into DB
            response = {
                ...response,
                success: true,
                data: 'Article was updated successfully!'
            }
            return response;

        } catch (error) {
            // There was an error on LokiJS
            response = {
                ...response,
                error: error
            }
            return response;
        }
    } else {
        //Implement message explaining to the user that article was not found and will insert in DB instead
        insertArticle(article);
    }
}


export function deleteArticle(id: string) {
    let response: IResponse<string> = {
        success: false,
        error: null,
        data: undefined,
        dateStamp: new Date()
    }
    const found = findOne(id); //Will use Loki methods to find if Article is on DB by id
    if (found) {
        try {
            //TODO: 
            // Delete article from DB
            response = {
                ...response,
                success: true,
                data: 'Article was deleted successfully!'
            }
            return response;

        } catch (error) {
            // There was an error on LokiJS
            response = {
                ...response,
                error: error
            }
            return response;
        }
    } else {
        //Implement message explaining to the user that article was not found and will insert in DB instead
        response = {
            ...response,
            error: 'Article was not found on Local DB!'
        }
        return response;
    }
}

export interface IBlog {
    id: string;
    title: string;
    date: string;
    headeralt: string;
    headersrc: string;
    contents: string;
}

export interface IResponse<T> {
    success: boolean;
    error: any;
    data: T;
    dateStamp: Date;
}