import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { lunaLitFormPersistanceMigrateStore } from "../../../store/lunaLitFormPersistanceMigrateStore";

@customElement("example-lunajs-result-migrate")
export class ExampleLunaJsResultMigrate extends LitElement {
  private telefonoController = lunaLitFormPersistanceMigrateStore.getState();

  private unsubscribe!: () => void;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = lunaLitFormPersistanceMigrateStore.subscribe(() => {
      this.telefonoController = lunaLitFormPersistanceMigrateStore.getState();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  render() {
    return html`<div>
      <h2>Resultado del formulario</h2>
      <p>Nombre telefono: ${this.telefonoController.nombre}</p>
      <p>Marca: ${this.telefonoController.marca}</p>
      <p>Centímetros: ${this.telefonoController.caracteristicas.centimetros}</p>
      <p>Pixeles Cámara: ${this.telefonoController.caracteristicas.pixelesCamara}</p>
      <p>Dual SIM: ${this.telefonoController.caracteristicas.dualSIM}</p>
      <p>Accesorio 1: ${this.telefonoController.accesorios[0]}</p>
      <p>Accesorio 2: ${this.telefonoController.accesorios[1]}</p>
    </div> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunajs-result-migrate": ExampleLunaJsResultMigrate;
  }
}
