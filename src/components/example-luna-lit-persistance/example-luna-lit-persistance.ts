import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/luna-lit-form-persistance";
import "./components/luna-lit-result-persistance";

@customElement("example-lunalit-persistance")
export class ExampleLunaLitPersistance extends LitElement {
  render() {
    return html`
      <div>
        <example-lunalit-form-persistance></example-lunalit-form-persistance>
        <example-lunalit-result-persistance></example-lunalit-result-persistance>
      </div>
    `;
  }

  static styles = css`
    div {
      display: flex;
      gap: 50px;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-persistance": ExampleLunaLitPersistance;
  }
}
