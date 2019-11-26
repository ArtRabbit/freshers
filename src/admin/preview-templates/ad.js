import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Ad = createClass({
  render() {
    const entry = this.props.entry;

	const dl = entry.getIn(["data","dl.download"]);
	const dlL = entry.getIn(["data","dl.downloadLabel"]);
	const dlOut = dl == undefined ? '' : html`<a href="${dl}" class="btn arrow">${dlL}</a>`;

    return html`
      <main>
      	<a href="${entry.getIn(["data", "link"], null)}" target="_blank" class="add fullheight fixed" rel="noopener noreferrer">
      		<img src="${entry.getIn(["data", "image"], null)}" alt="Ad" >
      	</a>
      </main>
    `;
  }
});


export default Ad;