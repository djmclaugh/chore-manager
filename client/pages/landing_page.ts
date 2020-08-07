import Vue, { VNode } from 'vue';
import Component from 'vue-class-component';

const LandingPageProps = Vue.extend({
  props: {},
});

@Component({
  components: {},
})
export default class LandingPage extends LandingPageProps {
  // Data

  // Computed

  // Methods

  // Hooks
  render(): VNode {
    return this.$createElement('p', 'hello world!');
  }
}
