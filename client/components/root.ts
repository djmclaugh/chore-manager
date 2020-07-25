import Vue, { VNode } from 'vue';
import Component from 'vue-class-component';

const RootProps = Vue.extend({
  props: {},
});

@Component({
  components: {},
})
export default class RootComponent extends RootProps {
  // Data

  // Computed

  // Methods

  // Hooks
  render(): VNode {
    return this.$createElement('p', 'hello world!');
  }
}
