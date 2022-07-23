/**
 * @vitest-environment jsdom
 */

import * as React from "react"
import * as Gatsby from "gatsby"
import { render } from "@testing-library/react"
import { vi } from "vitest"
import { SEO } from "../seo"

const useStaticQuery = vi.spyOn(Gatsby, `useStaticQuery`)
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
    siteTitle: `Testing Gatsby Head API`,
    siteUrl: `https://www.yourdomain.tld`,
    siteDescription: `Showing how to test Gatsby Head API with Vitest and Playwright`
    },
  },
}

describe(`SEO component`, () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`should have sensible defaults`, () => {
    const result = render(<SEO />, { container: document.head }).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <head>
        <title>
          Testing Gatsby Head API
        </title>
        <meta
          content="Showing how to test Gatsby Head API with Vitest and Playwright"
          name="description"
        />
        <link
          href="https://www.yourdomain.tld"
          rel="canonical"
        />
        <meta
          content="Testing Gatsby Head API"
          property="og:title"
        />
        <meta
          content="https://www.yourdomain.tld"
          property="og:url"
        />
        <meta
          content="Showing how to test Gatsby Head API with Vitest and Playwright"
          property="og:description"
        />
        <meta
          content="website"
          property="og:type"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="Testing Gatsby Head API"
          name="twitter:title"
        />
        <meta
          content="https://www.yourdomain.tld"
          name="twitter:url"
        />
        <meta
          content="Showing how to test Gatsby Head API with Vitest and Playwright"
          name="twitter:description"
        />
        <meta
          content="LekoArts"
          name="creator"
        />
      </head>
    `)
  })
  it(`should accept all common props`, () => {
    const result = render(
      <SEO
        title="Custom Title"
        description="Custom Description"
        pathname="/custom-path"
      />,
      { container: document.head }
    ).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <head>
        <title>
          Custom Title
        </title>
        <meta
          content="Custom Description"
          name="description"
        />
        <link
          href="https://www.yourdomain.tld/custom-path"
          rel="canonical"
        />
        <meta
          content="Custom Title"
          property="og:title"
        />
        <meta
          content="https://www.yourdomain.tld/custom-path"
          property="og:url"
        />
        <meta
          content="Custom Description"
          property="og:description"
        />
        <meta
          content="website"
          property="og:type"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="Custom Title"
          name="twitter:title"
        />
        <meta
          content="https://www.yourdomain.tld/custom-path"
          name="twitter:url"
        />
        <meta
          content="Custom Description"
          name="twitter:description"
        />
        <meta
          content="LekoArts"
          name="creator"
        />
      </head>
    `)
  })
})
 