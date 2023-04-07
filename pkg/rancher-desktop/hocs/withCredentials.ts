import Vue, { VueConstructor, VNode } from 'vue';

import type { ServerState } from '@pkg/main/commandServer/httpCommandServer';

interface WithCredentialsData {
  credentials: Omit<ServerState, 'pid'>;
}

interface WithCredentialsProps {
  credentials: Omit<ServerState, 'pid'>;
}

type WithCredentialsComponent = VueConstructor<Vue & WithCredentialsProps>;

export const withCredentials = (component: WithCredentialsComponent) => {
  return Vue.extend({
    name: `with-credentials-${ component.name }`,
    data(): WithCredentialsData {
      return {
        credentials: {
          user:     '',
          password: '',
          port:     0,
        },
      };
    },
    async fetch() {
      this.credentials = await this.$store.dispatch('credentials/fetchCredentials');
    },
    render(h): VNode {
      return h(
        component,
        { props: { credentials: this.credentials } },
      );
    },
  });
};
