import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LunaController } from "../../../lib/luna/luna-controller";
import { lunaLitFormPersistanceMigrateStore } from "../../../store/lunaLitFormPersistanceMigrateStore";

@customElement("example-lunalit-form-migrate")
export class ExampleLunaLitFormMigrate extends LitElement {
  private telefonoController = new LunaController(
    this,
    lunaLitFormPersistanceMigrateStore,
    (state) => state
  );

  render() {
    return html`<div>
      <h2>Formulario con Luna Lit con migracion de datos</h2>
      <form>
        <label>Nombre telefono:</label>
        <input
          type="text"
          .value=${this.telefonoController.value.nombre}
          @input=${(e: Event) =>
            this.telefonoController.value.setNombre(
              (e.target as HTMLInputElement).value
            )
          }
        />
        <br /><br />

        <label>Marca:</label>
        <input
          type="text"
          .value=${this.telefonoController.value.marca}
          @input=${(e: Event) =>
            this.telefonoController.value.setMarca(
              (e.target as HTMLInputElement).value
            )
          }
        />
        <br /><br />

        <label>Centímetros:</label>
        <input
          type="number"
          .value=${this.telefonoController.value.caracteristicas.centimetros}
          @input=${(e: Event) =>
            this.telefonoController.value.setCaracteristicas({
              ...this.telefonoController.value.caracteristicas,
              centimetros: Number((e.target as HTMLInputElement).value),
            })
          }
        />
        <br /><br />

        <label>Pixeles Cámara:</label>
        <input
          type="number"
          .value=${this.telefonoController.value.caracteristicas.pixelesCamara}
          @input=${(e: Event) =>
            this.telefonoController.value.setCaracteristicas({
              ...this.telefonoController.value.caracteristicas,
              pixelesCamara: Number((e.target as HTMLInputElement).value),
            })
          }
        />
        <br /><br />

        <label>Dual SIM:</label>
        <input
          type="checkbox"
          .checked=${this.telefonoController.value.caracteristicas.dualSIM}
          @change=${(e: Event) =>
            this.telefonoController.value.setCaracteristicas({
              ...this.telefonoController.value.caracteristicas,
              dualSIM: (e.target as HTMLInputElement).checked,
            })
          }
        />
        <br /><br />

        <label>Accesorio 1:</label>
        <input
          type="text"
          .value=${this.telefonoController.value.accesorios[0] ?? ""}
          @input=${(e: Event) =>
            this.telefonoController.value.setAccesorios([
              (e.target as HTMLInputElement).value,
              this.telefonoController.value.accesorios[1] ?? "",
            ])
          }
        />
        <br /><br />

        <label>Accesorio 2:</label>
        <input
          type="text"
          .value=${this.telefonoController.value.accesorios[1] ?? ""}
          @input=${(e: Event) =>
            this.telefonoController.value.setAccesorios([
              this.telefonoController.value.accesorios[0] ?? "",
              (e.target as HTMLInputElement).value,
            ])
          }
        />
      </form>
    </div> `;
  }

  static styles = css`
    label {
      display: inline-block;
      width: 120px;
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
    "example-lunalit-form-migrate": ExampleLunaLitFormMigrate;
  }
}
