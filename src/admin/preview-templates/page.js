import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
  render() {
    const entry = this.props.entry;

	const dl = entry.getIn(["data","dl.download"]);
	const dlL = entry.getIn(["data","dl.downloadLabel"]);
	const dlOut = dl == undefined ? '' : html`<a href="${dl}" class="btn arrow">${dlL}</a>`;

    return html`
      <main>
      	<article>
        	<h1>${entry.getIn(["data", "title"], null)}</h1>
			${dlOut}
			${this.props.widgetFor("body")}
		</article>
      </main>
    `;
  }
});

export default Page;
