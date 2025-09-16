import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import { lunaLitFormPersistanceMigrateStore } from "../../../store/lunaLitFormPersistanceMigrateStore";

@customElement("example-lunalit-result-migrate")
export class ExampleLunaLitResultMigrate extends LitElement {
  private telefonoController = new LunaController(
    this,
    lunaLitFormPersistanceMigrateStore,
    (state) => state
  );

  // Ejemplo de acceder a un campo específico del estado
  private marcaController = new LunaController(
    this,
    lunaLitFormPersistanceMigrateStore,
    (state) => state.marca
  );

  render() {
    return html`<div>
      <h2>Resultado del formulario</h2>
      <p>Nombre telefono: ${this.telefonoController.value.nombre}</p>
      <!-- Acceso a dato en especifico del estado -->
      <p>Marca: ${this.marcaController.value}</p>
      <!-- Acceso a dato en especifico del estado sin usar controlador (NO RECOMENDADO) -->
      <p>Centímetros: ${lunaLitFormPersistanceMigrateStore.getState().caracteristicas.centimetros}</p>
      <p>Pixeles Cámara: ${this.telefonoController.value.caracteristicas.pixelesCamara}</p>
      <p>Dual SIM: ${this.telefonoController.value.caracteristicas.dualSIM}</p>
      <p>Accesorio 1: ${this.telefonoController.value.accesorios[0]}</p>
      <p>Accesorio 2: ${this.telefonoController.value.accesorios[1]}</p>
    </div> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-result-migrate": ExampleLunaLitResultMigrate;
  }
}
