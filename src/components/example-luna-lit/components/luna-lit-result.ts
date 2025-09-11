import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import { Genero, lunaLitFormStore } from "../../../store/lunaLitFormStore";

@customElement("example-lunalit-result")
export class ExampleLunaLitResult extends LitElement {
  private personaController = new LunaController(
    this,
    lunaLitFormStore,
    (state) => state
  );

  render() {
    return html`<div>
      <h2>Resultado del formulario</h2>
      <p>Nombre: ${this.personaController.value.nombre}</p>
      <p>Genero: ${this.personaController.value.genero}</p>
      <p>Edad: ${this.personaController.value.edad}</p>
      <p>Mascota 1: ${this.personaController.value.mascotas[0]}</p>
      <p>Mascota 2: ${this.personaController.value.mascotas[1]}</p>
      <p>DNI: ${this.personaController.value.contacto.dni}</p>
      <p>Ciudad: ${this.personaController.value.contacto.ciudad}</p>
    </div> `;
  }

  static styles = css`
    
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-result": ExampleLunaLitResult;
  }
}
