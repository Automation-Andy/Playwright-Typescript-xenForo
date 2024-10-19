import { UI } from '@ui/ui';
import { Searching } from '@scripts/searching';
import { User } from '@scripts/user';

export class Scripts {
  constructor(private readonly _ui: UI) {}
  user = new User(this._ui);
  searching = new Searching(this._ui);
}
