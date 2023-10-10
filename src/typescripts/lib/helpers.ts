/**
 * Resize App container
 * @param client ZAFClient object
 * @param max max height available to resize to
 * @return will resolved after resize
 */
export async function resizeContainer(
    client: any,
    max: number = Number.POSITIVE_INFINITY,
): Promise<any> {
    const newHeight = Math.min(document.body.clientHeight, max)
    return client.invoke("resize", { height: newHeight })
}

/**
 * Helper to render a dataset using the same template function
 * @param set dataset
 * @param getTemplate function to generate template
 * @param initialValue any template string prepended
 * @return final template
 */
export function templatingLoop(
    set: any[],
    getTemplate: (...args: any) => any,
    initialValue = "",
): string {
    return set.reduce(
        (accumulator, item, index) =>
            `${accumulator}${getTemplate(item, index)}`,
        initialValue,
    )
}

/**
 * Render template
 * @param replacedNodeSelector selector of the node to be replaced
 * @param htmlString new html string to be rendered
 */
export function render(replacedNodeSelector: string, htmlString: string): void {
    const fragment = document.createRange().createContextualFragment(htmlString)
    const replacedNode = document.querySelector(replacedNodeSelector)

    replacedNode?.parentNode?.replaceChild(fragment, replacedNode)
}

/**
 * Helper to escape unsafe characters in HTML, including &, <, >, ", ', `, =
 * @param str String to be escaped
 * @return escaped string
 */
export function escapeSpecialChars(str: string): string {
    if (typeof str !== "string")
        throw new TypeError(
            "escapeSpecialChars function expects input in type String",
        )

    const escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
        "=": "&#x3D;",
    } as Record<string, string>

    return str.replace(/[&<>"'`=]/g, (m) => {
        return escape[m]
    })
}
