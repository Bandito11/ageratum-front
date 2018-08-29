
/**
 * Check if there is data save of local DB
 * 
 * If there is data on db, load on the main page
 * 
 * If there no data on db, get from API by ids not on db
 * Insert new Data from API into db
 * load data from db into main page
 * 
 */
import { AxiosStatic } from '../../axios';
import { domain } from '../../common';

import * as loki from 'loki';
declare const myAdapter;
declare const axios: AxiosStatic;

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

let domain;
function getListOfArticles() {
    const url = `${domain}/blog/list`;
    return axios.get(url);
    // .then(response => {
    //     if (response.status == 200) {
    //       this.blogLoaded = true;
    //       response.data.success ?
    //         this.listOfArticles = [...this.listOfArticles, ...response.data.data] :
    //         alert('There was an error retrieving the data. Please reload the page and try again!');
    //     }
    //   });
}

const db = create();
let usersColl;

function create() {
    const options = {
        autoloadCallback: loadDatabase,
        autoload: true,
        env: 'BROWSER'
    };
    return new loki('ageratum.db', options);
}

function loadDatabase() {
    usersColl = db.getCollection('Users');
    if (!usersColl) {
        usersColl = db.addCollection('Users');
    }
}

function insert(page) {
    let response: IResponse<null> = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date()
    };
    try {
        usersColl.insert(page);
        db.saveDatabase();
        response = {
            ...response,
            success: true
        };
        return response;
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: error
        };
        return response;
    }
}

function update(page) {
    let response: IResponse<null> = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date()
    };
    try {
        let result = usersColl.findOne({ name: { $eq: page.id } });
        result = { ...page };
        usersColl.update(result);
        db.saveDatabase();
        response = {
            ...response,
            success: true
        };
        return response;
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: error
        };
        return response;
    }
}

function remove(id) {
    let response: IResponse<null> = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date()
    };
    try {
        const result = usersColl.findOne({ name: { $eq: id } });
        usersColl.remove(result);
        db.saveDatabase();
        response = {
            ...response,
            success: true
        };
        return response;
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: error
        };
        return response;
    }
}

function getArticles() {
    return usersColl.data;
}

function getArticle(id) {
    return usersColl.findOne({ name: { $eq: id } });
}
