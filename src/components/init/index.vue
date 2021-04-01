<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { allSchemaQuery } from '@/graphql/allSchema.query';
import { userAuthorizedSubject } from '@/events/UserAuthorizedEvent';
import { schemaChangedSubject } from '@/events/SchemaChangedEvent';
import { allSchemaTableQuery } from '@/graphql/allSchemaTable.query';
import { allSchemaTableColumnBySchemaIdQuery } from '@/graphql/allSchemaTableColumnBySchemaId.query';
import { allSchemaTableFilterBySchemaIdQuery } from '@/graphql/allSchemaTableFilterBySchemaId.query';
import { columnDefinitionChangedSubject } from '@/events/ColumnDefinitionChangedEvent';
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
    schemaChangedSubject.asObservable().subscribe((message) => {
      if (message.id) {
        this.fetchColumn(message.id);
        this.fetchFilter(message.id);
      }
    });
    columnDefinitionChangedSubject.asObservable().subscribe((message) => {
      if (this.getProfile.schema) {
        this.fetchSchema(this.getProfile.schema);
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
            console.log(response.data.allSchema);
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
    },
    fetchColumn(schemaId) {
      defaultClient
        .query({
          query: allSchemaTableColumnBySchemaIdQuery,
          variables: {
            schemaId
          }
        })
        .then((response) => {
          console.log(response.data.allSchemaTableColumnBySchemaId);
          if (response) {
            store.dispatch('refreshColumn', response.data.allSchemaTableColumnBySchemaId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchFilter(schemaId) {
      defaultClient
        .query({
          query: allSchemaTableFilterBySchemaIdQuery,
          variables: {
            schemaId
          }
        })
        .then((response) => {
          console.log('&&&&&&&&&&');
          console.log(response.data.allSchemaTableFilterBySchemaId);
          if (response) {
            store.dispatch('refreshFilter', response.data.allSchemaTableFilterBySchemaId);
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
