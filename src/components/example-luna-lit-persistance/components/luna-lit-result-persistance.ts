import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import { lunaLitFormPersistanceStore } from "../../../store/lunaLitFormPersistanceStore";

@customElement("example-lunalit-result-persistance")
export class ExampleLunaLitResultPersistance extends LitElement {
  private cocheController = new LunaController(
    this,
    lunaLitFormPersistanceStore,
    (state) => state
  );

  render() {
    return html`<div>
      <h2>Resultado del formulario</h2>
      <p>Color: ${this.cocheController.value.color}</p>
      <p>RPM: ${this.cocheController.value.rpm}</p>
      <p>Marca: ${this.cocheController.value.marca}</p>
      <p>Puertas: ${this.cocheController.value.caracteristicas.puertas}</p>
      <p>Ruedas: ${this.cocheController.value.caracteristicas.ruedas}</p>
      <p>¿Es Electrico?: ${this.cocheController.value.caracteristicas.electrico ? 'Sí' : 'No'}</p>
      <p>Propietario 1: ${this.cocheController.value.propietarios[0]}</p>
      <p>Propietario 2: ${this.cocheController.value.propietarios[1]}</p>
    </div> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-result-persistance": ExampleLunaLitResultPersistance;
  }
}
