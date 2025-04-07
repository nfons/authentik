import { DEFAULT_CONFIG } from "@goauthentik/common/api/config";
import "@goauthentik/elements/chips/Chip";
import "@goauthentik/elements/chips/ChipGroup";
import "@goauthentik/elements/forms/HorizontalFormElement";
import { ModelForm } from "@goauthentik/elements/forms/ModelForm";
import "@goauthentik/elements/forms/SearchSelect";

import { msg } from "@lit/localize";
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { RbacApi, InitialPermissions } from "@goauthentik/api";

@customElement("ak-initial-permissions-form")
export class InitialPermissionsForm extends ModelForm<InitialPermissions, string> {
    loadInstance(pk: string): Promise<InitialPermissions> {
        return new RbacApi(DEFAULT_CONFIG).rbacInitialPermissionsRetrieve({
            id: Number(pk),
        });
    }

    getSuccessMessage(): string {
        return this.instance
            ? msg("Successfully updated initial permissions.")
            : msg("Successfully created initial permissions.");
    }

    async send(data: InitialPermissions): Promise<InitialPermissions> {
        if (this.instance?.pk) {
            return new RbacApi(DEFAULT_CONFIG).rbacInitialPermissionsPartialUpdate({
                id: this.instance.pk,
                patchedInitialPermissionsRequest: data,
            });
        } else {
            return new RbacApi(DEFAULT_CONFIG).rbacInitialPermissionsCreate({
                initialPermissionsRequest: data,
            });
        }
    }

    renderForm(): TemplateResult {
        return html`<form class="pf-c-form pf-m-horizontal">
            <ak-form-element-horizontal label=${msg("Name")} ?required=${true} name="name">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.name)}"
                    class="pf-c-form-control"
                    required
                />
            </ak-form-element-horizontal>
            <ak-form-element-horizontal label=${msg("Mode")} ?required=${true} name="mode">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.mode)}"
                    class="pf-c-form-control"
                    required
                />
            </ak-form-element-horizontal>
            <ak-form-element-horizontal label=${msg("Role")} ?required=${true} name="role">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.role)}"
                    class="pf-c-form-control"
                    required
                />
            </ak-form-element-horizontal>
        </form>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-initial-permissions-form": InitialPermissionsForm;
    }
}
