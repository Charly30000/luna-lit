import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import {
  Color,
  lunaLitFormPersistanceStore,
} from "../../../store/lunaLitFormPersistanceStore";

@customElement("example-lunalit-form-persistance")
export class ExampleLunaLitFormPersistance extends LitElement {
  private cocheController = new LunaController(
    this,
    lunaLitFormPersistanceStore,
    (state) => state
  );

  render() {
    return html`<div>
      <h2>Formulario con Luna Lit con persistencia de datos</h2>
      <form>
        <label>Color:</label>
        <select
          .value=${this.cocheController.value.color}
          @change=${(e: Event) =>
            this.cocheController.value.setColor(
              (e.target as HTMLSelectElement).value as any
            )}
        >
          ${Object.values(Color).map(
            (col) =>
              html`<option
                value=${col}
                ?selected=${this.cocheController.value.color === col}
              >
                ${col}
              </option>`
          )}
        </select>
        <br /><br />

        <label>RPM:</label>
        <input
          type="number"
          .value=${this.cocheController.value.rpm}
          @input=${(e: Event) =>
            this.cocheController.value.setRpm(
              Number((e.target as HTMLInputElement).value)
            )}
        />
        <br /><br />

        <label>Marca:</label>
        <input
          type="text"
          .value=${this.cocheController.value.marca}
          @input=${(e: Event) =>
            this.cocheController.value.setMarca(
              (e.target as HTMLInputElement).value
            )}
        />
        <br /><br />

        <label>Puertas:</label>
        <input
          type="number"
          .value=${this.cocheController.value.caracteristicas.puertas}
          @input=${(e: Event) =>
            this.cocheController.value.setCaracteristicas({
              ...this.cocheController.value.caracteristicas,
              puertas: Number((e.target as HTMLInputElement).value),
            })}
        />
        <br /><br />

        <label>Ruedas:</label>
        <input
          type="number"
          .value=${this.cocheController.value.caracteristicas.ruedas}
          @input=${(e: Event) =>
            this.cocheController.value.setCaracteristicas({
              ...this.cocheController.value.caracteristicas,
              ruedas: Number((e.target as HTMLInputElement).value),
            })}
        />
        <br /><br />

        <label>Eléctrico:</label>
        <input
          type="checkbox"
          .checked=${this.cocheController.value.caracteristicas.electrico}
          @change=${(e: Event) =>
            this.cocheController.value.setCaracteristicas({
              ...this.cocheController.value.caracteristicas,
              electrico: (e.target as HTMLInputElement).checked,
            })}
        />
        <br /><br />

        <label>Propietario 1:</label>
        <input
          type="text"
          .value=${this.cocheController.value.propietarios[0]}
          @input=${(e: Event) =>
            this.cocheController.value.setPropietarios([
              (e.target as HTMLInputElement).value,
              this.cocheController.value.propietarios[1],
            ])}
        />
        <br /><br />

        <label>Propietario 2:</label>
        <input
          type="text"
          .value=${this.cocheController.value.propietarios[1]}
          @input=${(e: Event) =>
            this.cocheController.value.setPropietarios([
              this.cocheController.value.propietarios[0],
              (e.target as HTMLInputElement).value,
            ])}
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
    "example-lunalit-form-persistance": ExampleLunaLitFormPersistance;
  }
}
