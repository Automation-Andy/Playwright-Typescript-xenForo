import { Page } from '@playwright/test';

export class Editor {
  private readonly _toolbar = new Toolbar(this._page);
  private readonly _locators = {
    txtEditor: this._page.getByRole('paragraph'),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  get toolbar() {
    return this._toolbar;
  }

  async enterMessage(message: string) {
    await this._locators.txtEditor.fill(message);
  }
}

class Toolbar {
  private readonly _locators = {
    btnRemoveFormatting: this._page.getByRole('button', { name: 'Remove formatting' }),
    btnBold: this._page.getByRole('button', { name: 'Bold' }),
    btnItalic: this._page.getByRole('button', { name: 'Italic' }),
    btnFontSize: this._page.getByRole('button', { name: 'Font size' }),
    btnTextColor: this._page.getByRole('button', { name: 'Text color' }),
    btnMoreOptions: this._page.locator('#moreText-1'),
    btnFontFamily: this._page.getByRole('button', { name: 'Font family' }),
    btnStrikeThrough: this._page.getByRole('button', { name: 'Strike through' }),
    btnUnderline: this._page.getByRole('button', { name: 'Underline' }),
    btnInlineCode: this._page.getByRole('button', { name: 'Inline code' }),
    btnInlineSpoiler: this._page.getByRole('button', { name: 'Inline spoiler' }),
    btnList: this._page.getByRole('button', { name: 'List' }),
    btnIndent: this._page.getByRole('button', { name: 'Indent' }),
    btnFormat: this._page.getByRole('button', { name: 'Paragraph format' }),
    btnInsertLink: this._page.getByRole('button', { name: 'Insert link' }),
    btnInsertImage: this._page.getByRole('button', { name: 'Insert image' }),
    btnSmilies: this._page.getByRole('button', { name: 'Smilies' }),
    btnMedia: this._page.getByRole('button', { name: 'Media' }),
    btnQuote: this._page.getByRole('button', { name: 'Quote' }),
    btnInsertTable: this._page.getByRole('button', { name: 'Insert table' }),
    btnUndo: this._page.getByRole('button', { name: 'Undo' }),
    btnRedo: this._page.getByRole('button', { name: 'Redo' }),
    btnToggleBBCode: this._page.getByRole('button', { name: 'Toggle BB code' }),
    btnDrafts: this._page.getByRole('button', { name: 'Drafts' }),
    btnPreview: this._page.getByRole('button', { name: 'Preview' }),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }
}
