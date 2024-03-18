import axios, { AxiosResponse } from 'axios';

export async function getFromSnykOrgs(){
    const SNYK_AUTHORIZATION_TOKEN = ""
    const SNYK_ORG = ""
    const LIMIT = 10
    const API_VERSION = "2024-01-23"
    const snykURI = `https://api.snyk.io/rest/orgs/${SNYK_ORG}/issues?version=${API_VERSION}&limit=${LIMIT}`
    try {
        const resp: AxiosResponse = await axios.get(snykURI, {
            headers: {
                "Authorization": `token ${SNYK_AUTHORIZATION_TOKEN}`
            }
        })
        return resp.data.data
    } catch (error) {
        console.log("GOT ERROR IN AXIOS: ", error)
    }
}