import { Page } from '@playwright/test';

export class Editor {
  private readonly _toolbar = new Toolbar(this.page);

  constructor(private readonly page: Page) {}

  get toolbar() {
    return this._toolbar;
  }
}

class Toolbar {
  readonly locators = {
    txtEditor: this.page.getByRole('paragraph'),
    btnRemoveFormatting: this.page.getByRole('button', { name: 'Remove formatting' }),
    btnBold: this.page.getByRole('button', { name: 'Bold' }),
    btnItalic: this.page.getByRole('button', { name: 'Italic' }),
    btnFontSize: this.page.getByRole('button', { name: 'Font size' }),
    btnTextColor: this.page.getByRole('button', { name: 'Text color' }),
    btnMoreOptions: this.page.locator('#moreText-1'),
    btnFontFamily: this.page.getByRole('button', { name: 'Font family' }),
    btnStrikeThrough: this.page.getByRole('button', { name: 'Strike through' }),
    btnUnderline: this.page.getByRole('button', { name: 'Underline' }),
    btnInlineCode: this.page.getByRole('button', { name: 'Inline code' }),
    btnInlineSpoiler: this.page.getByRole('button', { name: 'Inline spoiler' }),
    btnList: this.page.getByRole('button', { name: 'List' }),
    btnIndent: this.page.getByRole('button', { name: 'Indent' }),
    btnFormat: this.page.getByRole('button', { name: 'Paragraph format' }),
    btnInsertLink: this.page.getByRole('button', { name: 'Insert link' }),
    btnInsertImage: this.page.getByRole('button', { name: 'Insert image' }),
    btnSmilies: this.page.getByRole('button', { name: 'Smilies' }),
    btnMedia: this.page.getByRole('button', { name: 'Media' }),
    btnQuote: this.page.getByRole('button', { name: 'Quote' }),
    btnInsertTable: this.page.getByRole('button', { name: 'Insert table' }),
    btnUndo: this.page.getByRole('button', { name: 'Undo' }),
    btnRedo: this.page.getByRole('button', { name: 'Redo' }),
    btnToggleBBCode: this.page.getByRole('button', { name: 'Toggle BB code' }),
    btnDrafts: this.page.getByRole('button', { name: 'Drafts' }),
    btnPreview: this.page.getByRole('button', { name: 'Preview' }),
  };
  constructor(private readonly page: Page) {}
}
