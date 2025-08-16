<template>
  <div v-if="editor" class="container">
    <!-- Toolbar -->
    <div class="button-group">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        Ordered List
      </button>
    </div>

    <!-- Editor content -->
    <editor-content :editor="editor" class="tiptap" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import { ListItem } from '@tiptap/extension-list'

export default {
  components: { EditorContent },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
      ],
      content: '<p>Hello <strong>World</strong>! 🌍</p>',
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style>
.tiptap {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 150px;
  border-radius: 6px;
}
.is-active {
  background: #ddd;
}
</style>
