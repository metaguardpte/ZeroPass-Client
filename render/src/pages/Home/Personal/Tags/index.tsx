import { getPersonalItemsByTag } from '@/services/api/vaultItems';
import { FormattedMessage } from 'umi';
import AppList from '../../components/AppList';
import { ListContexProvider } from '../../Context/ListContext';
import { itemRequesters } from '../../requesters';

export default (props: any) => {
    const pathArr = props.location.pathname.split('/');
    const len = pathArr.length;
    const id = pathArr[len - 1];
    const requesters = { ...itemRequesters, load: () => getPersonalItemsByTag(id) };
    return (
        <ListContexProvider requesters={requesters}>
            <AppList {...props} title={<FormattedMessage id="vault.home.title.logins" />} />
        </ListContexProvider>
    );
};
