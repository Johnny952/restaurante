import dynamic from 'next/dynamic';
import Loader from '../../components/loader';

const AddLanguageView = dynamic(() => import('./view'), {
    loading: () => <Loader />
})

export default function AddLanguagePage() {
    return (
        <AddLanguageView />
    );
}
