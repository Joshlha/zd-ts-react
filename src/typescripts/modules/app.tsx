/**
 *  Example app
 **/
import React from "react"
// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom"
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming"
import { Grid, Row, Col } from "@zendeskgarden/react-grid"
import { UnorderedList } from "@zendeskgarden/react-typography"
import { resizeContainer, escapeSpecialChars as escape } from "../lib/helpers"

const MAX_HEIGHT = 1000
const API_ENDPOINTS = {
    organizations: "/api/v2/organizations.json",
}

class App {
    _client: any
    initializePromise: Promise<any>

    constructor(client: any, appData: any) {
        this._client = client

        // this.initializePromise is only used in testing
        // indicate app initilization(including all async operations) is complete
        this.initializePromise = this.init()
    }

    /**
     * Initialize module, render main template
     */
    async init(): Promise<any> {
        const currentUser = (await this._client.get("currentUser")).currentUser

        const organizationsResponse = await this._client
            .request(API_ENDPOINTS.organizations)
            .catch(this._handleError.bind(this))

        const organizations =
            organizationsResponse != null
                ? organizationsResponse.organizations
                : []

        const appContainer = document.querySelector(".main")

        render(
            <ThemeProvider theme={{ ...DEFAULT_THEME }}>
                <Grid>
                    <Row>
                        <Col data-test-id="sample-app-description">
                            Hi {escape(currentUser.name)}, this is a sample app
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span>default.organizations:</span>
                            <UnorderedList data-test-id="organizations">
                                {organizations.map((organization: any) => (
                                    <UnorderedList.Item
                                        key={`organization-${organization.id}`}
                                        data-test-id={`organization-${organization.id}`}
                                    >
                                        {escape(organization.name)}
                                    </UnorderedList.Item>
                                ))}
                            </UnorderedList>
                        </Col>
                    </Row>
                </Grid>
            </ThemeProvider>,
            appContainer,
        )
        return await resizeContainer(this._client, MAX_HEIGHT)
    }

    /**
     * Handle error
     * @param {Object} error error object
     */
    _handleError(error: any): void {
        console.log("An error is handled here: ", error.message)
    }
}

export default App
