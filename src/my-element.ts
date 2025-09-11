import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/example-luna-lit/example-luna-lit";
import "./components/example-luna-lit-persistance/example-luna-lit-persistance";
import "./components/example-luna-lit-migrate/example-luna-lit-migrate";
import "./components/example-luna-migrate-js/example-luna-js-migrate";

import { LunaController } from "./lib/luna/luna-controller";
import { lunaStepListStore } from "./store/stepListStore";

@customElement("my-element")
export class MyElement extends LitElement {
  private stepListController = new LunaController(
    this,
    lunaStepListStore,
    (state) => state
  );

  private get currentForm() {
    const forms = {
      lunaLit: html`<example-lunalit></example-lunalit>`,
      lunaLitPersistance: html`<example-lunalit-persistance></example-lunalit-persistance>`,
      lunaLitMigrate: html`<example-lunalit-migrate></example-lunalit-migrate>`,
      lunaJsMigrate: html`<example-lunajs-migrate></example-lunajs-migrate>`,
    };
    return forms[this.stepListController.value.formulario];
  }
  render() {
    return html`
      <div class="container">
        <div>
          <button
            class="btn"
            @click=${() =>
              this.stepListController.value.setFormulario("lunaLit")}
          >
            Luna Lit normal
          </button>
          <button
            class="btn"
            @click=${() =>
              this.stepListController.value.setFormulario("lunaLitPersistance")}
          >
            Luna Lit con persitencia de datos
          </button>
          <button
            class="btn"
            @click=${() =>
              this.stepListController.value.setFormulario("lunaLitMigrate")}
          >
            Luna Lit con migracion de datos
          </button>
          <button
            class="btn"
            @click=${() =>
              this.stepListController.value.setFormulario("lunaJsMigrate")}
          >
            Luna con Javascript puro
          </button>
        </div>
        <div>${this.currentForm}</div>
      </div>
    `;
  }

  static styles = css`
    h1 {
      color: blue;
    }
    .btn {
      padding: 10px;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
