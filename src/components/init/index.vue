<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { allSchemaQuery } from '@/graphql/allSchema.query';
import { userAuthorizedSubject } from '@/events/UserAuthorizedEvent';
import { schemaChangedSubject } from '@/events/SchemaChangedEvent';
import { allSchemaTableQuery } from '@/graphql/allSchemaTable.query';
import { defaultClient } from '../../apollo';

export default {
  name: 'Init',
  computed: {
    ...mapGetters(['getProfile']),
    getTheme() {
      return this.getProfile.theme;
    }
  },
  created() {
    if (this.getProfile.theme === 'theme_light') {
      document.body.style.backgroundColor = 'var(--color-global-lightmode)';
    } else {
      document.body.style.backgroundColor = 'var(--color-global-darkmode)';
    }
  },
  watch: {
    getTheme() {
      if (this.getProfile.theme === 'theme_light') {
        document.body.style.backgroundColor = 'var(--color-global-lightmode)';
      } else {
        document.body.style.backgroundColor = 'var(--color-global-darkmode)';
      }
    }
  },
  mounted() {
    userAuthorizedSubject.asObservable().subscribe((message) => {
      if (message.isAuth) {
        this.fetchSchema();
        this.fetchTable();
      }
    });
  },
  methods: {
    fetchSchema() {
      defaultClient
        .query({
          query: allSchemaQuery,
          variables: {}
        })
        .then((response) => {
          if (response) {
            console.log(this.getProfile);
            store.dispatch('refreshSchema', response.data.allSchema);
            if (this.getProfile.schema && this.getProfile.schema !== '') {
              schemaChangedSubject.next({ id: this.getProfile.schema });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchTable() {
      console.log('********************');
      defaultClient
        .query({
          query: allSchemaTableQuery,
          variables: {}
        })
        .then((response) => {
          console.log(response.data.allSchemaTable);
          if (response) {
            store.dispatch('refreshTable', response.data.allSchemaTable);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
