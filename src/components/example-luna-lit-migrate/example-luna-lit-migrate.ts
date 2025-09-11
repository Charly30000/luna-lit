import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/luna-lit-form-migrate";
import "./components/luna-lit-result-migrate";

@customElement("example-lunalit-migrate")
export class ExampleLunaLitMigrate extends LitElement {
  render() {
    return html`
      <button class="btn" @click=${this._handleInjectData}>
        Inyectar datos de la version 1 en el store
      </button>
      <div>
        <example-lunalit-form-migrate></example-lunalit-form-migrate>
        <example-lunalit-result-migrate></example-lunalit-result-migrate>
      </div>
    `;
  }

  _handleInjectData() {
    const dataV1 = {
      nombreTelefono: "Galaxy S21",
      marcaTelefono: "Samsung",
      caracteristicas: {
        pulgadas: 6.2,
        pixelesCamara: 64,
        dualSIM: true,
      },
      accesorios: ["Funda", "Cargador"],
    };
    const store = {
      state: dataV1,
      timestamp: Date.now() - 1000,
      version: 1,
    };
    localStorage.setItem(
      "luna-lit-form-persistance-store",
      JSON.stringify(store)
    );
  }

  static styles = css`
    div {
      display: flex;
      gap: 50px;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
    }
    .btn {
      margin-top: 10px;
      padding: 10px;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-migrate": ExampleLunaLitMigrate;
  }
}
