import axios, { AxiosResponse } from 'axios';

export async function getFromSnykOrgs(){
    const snykURI = "https://api.snyk.io/rest/orgs/SNYK_ORG/issues?version=2023-11-27%7Ebeta&limit=10"
    try {
        const resp: AxiosResponse = await axios.get(snykURI, {
            headers: {
                "Authorization": "token SNYK_AUTHORIZATION_TOKEN"
            }
        })
        return resp.data.data
    } catch (error) {
        console.log("GOT ERROR IN AXIOS: ", error)
    }
}