import { UserScripts } from '@scripts/userScripts';
import { UI } from '@ui/ui';

export class Scripts {
  constructor(private readonly _ui: UI) {}
  userScripts = new UserScripts(this._ui);
}
