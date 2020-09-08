## Prerequisites

If you do not have Gatsby installed yet, do it first.

```text
npm install --global gatsby
```

## Getting started

Clone the repository.

```text
git clone https://github.com/jo3rn/jo3rn.de.git
```

Go into the repository and run

```text
gatsby develop
```

to hot-serve your website on http://localhost:8000 or

```text
gatsby build
```

to create static site ready to host in `/public`.

## Features:

- Easy editable content in **Markdown** files (posts, pages and parts)
- **CSS** with `styled-jsx` and `PostCSS`
- **SEO** (sitemap generation, robot.txt, meta and OpenGraph Tags)
- **Images** lazy loading and `webp` support (gatsby-image)
- Post **categories** (category based post list)
- **Contact** form (Netlify form handling)
- Form elements and validation with `ant-design`
- **RSS** feed
- 100% **PWA** (manifest.webmanifest, offline support, favicons)
- App **favicons** generator (node script)
- Easy customizable base **styles** via `theme` object generated from `yaml` file (fonts, colors, sizes)
- **ESLint** (google config)
- **Prettier** code styling
- Webpack `BundleAnalyzerPlugin`
- **Gravatar** image (optional) instead local Avatar/Logo image

### Instructions & tutorials

Save blog posts with the naming pattern `/YYYY-MM-DD--title-of-post/` here:
```text
root
  ├── content
  │   ├── posts
```

Save pages here:
```text
root
  ├── content
  │   ├── pages
```
Naming pattern for pages that shall appear in the menu: `/XX--title/` (where XX is a number)

## Windows users

You should take a look at this: [Gatsby on Windows](https://www.gatsbyjs.org/docs/gatsby-on-windows/)

## Authors

- Jörn Auerbach [@jo3rn](https://github.com/jo3rn)

This is a mix of the gatsby starters [hero blog](https://github.com/greglobinski/gatsby-starter-hero-blog) and [startbootstrap-agency](https://github.com/thundermiracle/gatsby-startbootstrap-agency). See also the list of [contributors](https://github.com/jo3rn/jo3rn.de/graphs/contributors) who participated in this project.

## Contributing

- Fork the repo
- Create your feature branch (git checkout -b feature/fooBar)
- Commit your changes (git commit -am 'Add some fooBar')
- Push to the branch (git push origin feature/fooBar)
- Create a new Pull Request

## Licence

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
