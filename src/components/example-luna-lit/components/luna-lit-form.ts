import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import { Genero, lunaLitFormStore } from "../../../store/lunaLitFormStore";

@customElement("example-lunalit-form")
export class ExampleLunaLitForm extends LitElement {
  private personaController = new LunaController(
    this,
    lunaLitFormStore,
    (state) => state
  );

  render() {
    return html`<div>
      <h2>Formulario con Luna Lit</h2>
      <form>
        <label>Nombre <br/>(15 caracteres):</label>
        <input
          type="text"
          .value=${this.personaController.value.nombre}
          @input=${(e: Event) =>
            this.personaController.value.setNombre(
              (e.target as HTMLInputElement).value
            )}
        />

        ${this.personaController.value.errorNombre
          ? html`<br /><span style="color: red;"
                >${this.personaController.value.errorNombre}</span
              >`
          : null}

        <br />
        <br />
        <label>Genero:</label>
        <select
          .value=${this.personaController.value.genero}
          @change=${(e: Event) =>
            this.personaController.value.setGenero(
              (e.target as HTMLSelectElement).value as Genero
            )}
        >
          ${Object.values(Genero).map(
            (gen) =>
              html`<option
                value=${gen}
                ?selected=${this.personaController.value.genero === gen}
              >
                ${gen}
              </option>`
          )}
        </select>
        <br />
        <br />
        <label>Edad:</label>
        <input
          type="number"
          .value=${this.personaController.value.edad}
          @input=${(e: Event) =>
            this.personaController.value.setEdad(
              Number((e.target as HTMLInputElement).value)
            )}
        />
        <br />
        <br />
        <label>Mascota 1:</label>
        <input
          type="text"
          .value=${this.personaController.value.mascotas[0]}
          @input=${(e: Event) =>
            this.personaController.value.setMascotas([
              (e.target as HTMLInputElement).value,
              this.personaController.value.mascotas[1],
            ])}
        />
        <br />
        <br />
        <label>Mascota 2:</label>
        <input
          type="text"
          .value=${this.personaController.value.mascotas[1]}
          @input=${(e: Event) =>
            this.personaController.value.setMascotas([
              this.personaController.value.mascotas[0],
              (e.target as HTMLInputElement).value,
            ])}
        />
        <br />
        <br />
        <label>DNI:</label>
        <input
          type="text"
          .value=${this.personaController.value.contacto.dni}
          @input=${(e: Event) =>
            this.personaController.value.setContacto({
              ...this.personaController.value.contacto,
              dni: (e.target as HTMLInputElement).value,
            })}
        />
        <br />
        <br />
        <label>Ciudad:</label>
        <input
          type="text"
          .value=${this.personaController.value.contacto.ciudad}
          @input=${(e: Event) =>
            this.personaController.value.setContacto({
              ...this.personaController.value.contacto,
              ciudad: (e.target as HTMLInputElement).value,
            })}
        />
      </form>
    </div> `;
  }

  static styles = css`
    label {
      display: inline-block;
      width: 100px;
    }
    input,
    select {
      width: 200px;
      padding: 5px;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "example-lunalit-form": ExampleLunaLitForm;
  }
}
