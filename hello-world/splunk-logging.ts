/**
 * Splunk logging for AWS Lambda
 * 
 * Official Splunk script - it's automatically generated when using the blueprint:
 * https://dev.splunk.com/enterprise/docs/devtools/httpeventcollector/useawshttpcollector/createlambdafunctionnodejs/
 * 
 * This function logs to a Splunk host using Splunk's HTTP event collector API.
 *
 * Define the following Environment Variables in the console below to configure
 * this function to log to your Splunk host:
 *
 * 1. SPLUNK_HEC_URL: URL address for your Splunk HTTP event collector endpoint.
 * Default port for event collector is 8088. Example: https://host.com:8088/services/collector
 *
 * 2. SPLUNK_HEC_TOKEN: Token for your Splunk HTTP event collector.
 * To create a new token for this Lambda function, refer to Splunk Docs:
 * http://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Create_an_Event_Collector_token
 */

import { getFromSnykOrgs } from "./snyk-requester";
import { Logger as SplunkLogger } from 'splunk-logging';

const loggerConfig = {
    url: "SPLUNK_HEC_URL",
    token: "SPLUNK_HEC_TOKEN",
    maxBatchCount: 10,
};

const logger = new SplunkLogger(loggerConfig);

interface snykData {
    attributes: any, 
    id: string,
    relationships: any,
    type: string,
}

export const handler = async (event: any, context: any, callback: any) => {

    const issues: snykData[] = await getFromSnykOrgs()

    let totalLowIssues = 0
    let totalMedOrHighIssues = 0

    issues.forEach(issue => {
        if (issue.attributes["effective_severity_level"] !== "low") {
            totalMedOrHighIssues++
            const payload = {
                message: {
                    "snykId": issue.id,
                    "title": issue.attributes["title"],
                    "organization": issue.relationships.organization.data.id,
                    "severity": issue.attributes["effective_severity_level"],
                }
            } 
            try {
                logger.send(payload)
            } catch (error) {
                console.log(error)
            }
        } else {
            totalLowIssues++
        }
    });

    console.log("totalLowIssues: ", totalLowIssues)
    console.log("totalMedOrHighIssues: ", totalMedOrHighIssues)
};


  
  
