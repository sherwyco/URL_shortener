import axios from "axios";

const host = "http://localhost:5000"

export const getData = (endPoint: string, queryParams: string, inputParams: object) => {
    return new Promise((resolve, reject) => {
        axios
            .get(host + endPoint + queryParams, {
                params: inputParams
            }
            )
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const postData = (endPoint: string, queryParams: string, inputParams: object) => {
    return new Promise((resolve, reject) => {
        axios
            .post(host + endPoint + queryParams, {
                params: inputParams
            }
            )
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
