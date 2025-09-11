import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { lunaLitFormPersistanceMigrateStore } from "../../../store/lunaLitFormPersistanceMigrateStore";

@customElement("example-lunajs-form-migrate")
export class ExampleLunaJsFormMigrate extends LitElement {
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
      <h2>Formulario con Luna Javascript con migracion de datos</h2>
      <form>
        <label>Nombre telefono:</label>
        <input
          type="text"
          .value=${this.telefonoController.nombre}
          @input=${(e: Event) =>
            this.telefonoController.setNombre(
              (e.target as HTMLInputElement).value
            )}
        />
        <br /><br />

        <label>Marca:</label>
        <input
          type="text"
          .value=${this.telefonoController.marca}
          @input=${(e: Event) =>
            this.telefonoController.setMarca(
              (e.target as HTMLInputElement).value
            )}
        />
        <br /><br />

        <label>Centímetros:</label>
        <input
          type="number"
          .value=${this.telefonoController.caracteristicas.centimetros}
          @input=${(e: Event) =>
            this.telefonoController.setCaracteristicas({
              ...this.telefonoController.caracteristicas,
              centimetros: Number((e.target as HTMLInputElement).value),
            })}
        />
        <br /><br />

        <label>Pixeles Cámara:</label>
        <input
          type="number"
          .value=${this.telefonoController.caracteristicas.pixelesCamara}
          @input=${(e: Event) =>
            this.telefonoController.setCaracteristicas({
              ...this.telefonoController.caracteristicas,
              pixelesCamara: Number((e.target as HTMLInputElement).value),
            })}
        />
        <br /><br />

        <label>Dual SIM:</label>
        <input
          type="checkbox"
          .checked=${this.telefonoController.caracteristicas.dualSIM}
          @change=${(e: Event) =>
            this.telefonoController.setCaracteristicas({
              ...this.telefonoController.caracteristicas,
              dualSIM: (e.target as HTMLInputElement).checked,
            })}
        />
        <br /><br />

        <label>Accesorio 1:</label>
        <input
          type="text"
          .value=${this.telefonoController.accesorios[0] ?? ""}
          @input=${(e: Event) =>
            this.telefonoController.setAccesorios([
              (e.target as HTMLInputElement).value,
              this.telefonoController.accesorios[1] ?? "",
            ])}
        />
        <br /><br />

        <label>Accesorio 2:</label>
        <input
          type="text"
          .value=${this.telefonoController.accesorios[1] ?? ""}
          @input=${(e: Event) =>
            this.telefonoController.setAccesorios([
              this.telefonoController.accesorios[0] ?? "",
              (e.target as HTMLInputElement).value,
            ])}
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
    "example-lunajs-form-migrate": ExampleLunaJsFormMigrate;
  }
}
