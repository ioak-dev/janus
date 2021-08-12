<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { allSchemaQuery } from '@/graphql/allSchema.query';
import { userAuthorizedSubject } from '@/events/UserAuthorizedEvent';
import { schemaChangedSubject } from '@/events/SchemaChangedEvent';
import { allSchemaTableQuery } from '@/graphql/allSchemaTable.query';
import { userQuery } from '@/graphql/user.query';
import { allSchemaTableColumnBySchemaIdQuery } from '@/graphql/allSchemaTableColumnBySchemaId.query';
import { allSchemaTableFilterBySchemaIdQuery } from '@/graphql/allSchemaTableFilterBySchemaId.query';
import { columnDefinitionChangedSubject } from '@/events/ColumnDefinitionChangedEvent';
import { filterDefinitionChangedSubject } from '@/events/FilterDefinitionChangedEvent';
import { httpGet } from '@/library/RestTemplate';
import IconsList from '@/components/IconSwatch/IconsList.json';
import { defaultClient } from '../../apollo';

export default {
  name: 'Init',
  computed: {
    ...mapGetters(['getProfile', 'getSchemaLookup']),
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
    this.fetchSpace();
    this.fetchIcon();
    userAuthorizedSubject.asObservable().subscribe((message) => {
      if (message.isAuth) {
        this.fetchSchema();
        this.fetchTable();
        this.fetchUser();
      }
    });
    schemaChangedSubject.asObservable().subscribe((message) => {
      if (message.reference && this.getSchemaLookup[message.reference]) {
        this.fetchColumn(this.getSchemaLookup[message.reference]);
        this.fetchFilter(this.getSchemaLookup[message.reference]);
      }
    });
    columnDefinitionChangedSubject.asObservable().subscribe((message) => {
      this.replaceColumn(message.tableId, message.columnList);
    });
    filterDefinitionChangedSubject.asObservable().subscribe((message) => {
      if (this.getProfile.schema) {
        this.fetchFilter(this.getProfile.schema);
      }
    });
  },
  methods: {
    fetchSpace() {
      httpGet('/realm/introspect', null).then((response) => {
        if (response.status === 200) {
          store.dispatch('refreshSpace', response.data);
        }
      });
    },
    fetchIcon() {
      store.dispatch('refreshIcon', IconsList.icons);
    },
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
              schemaChangedSubject.next({ reference: this.getProfile.schema });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchUser() {
      console.log('********************');
      defaultClient
        .query({
          query: userQuery,
          variables: {}
        })
        .then((response) => {
          console.log(response.data.user);
          if (response) {
            store.dispatch('refreshUser', response.data.user);
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
          if (response) {
            store.dispatch('refreshFilter', response.data.allSchemaTableFilterBySchemaId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    replaceColumn(tableId, payload) {
      store.dispatch('replaceColumnByTableId', { tableId, payload });
    }
  }
};
</script>
<style lang="scss" scoped></style>
