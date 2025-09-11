import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/luna-lit-form";
import "./components/luna-lit-result";

@customElement("example-lunalit")
export class ExampleLunaLit extends LitElement {
  render() {
    return html`
      <div>
        <example-lunalit-form></example-lunalit-form>
        <example-lunalit-result></example-lunalit-result>
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
    "example-lunalit": ExampleLunaLit;
  }
}
