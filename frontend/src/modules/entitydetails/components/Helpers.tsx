import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Localized } from '@fluent/react';

import './Helpers.css';

import { useAppDispatch } from 'hooks';
import * as editor from 'core/editor';
import { TeamComments, CommentCount } from 'modules/teamcomments';
import { Terms, TermCount } from 'modules/terms';
import { Machinery, MachineryCount } from 'modules/machinery';
import { OtherLocales, OtherLocalesCount } from 'modules/otherlocales';

import type { Entity } from 'core/api';
import type { TermState } from 'core/term';
import type { TeamCommentState } from 'modules/teamcomments';
import type { Locale } from 'core/locale';
import type { NavigationParams } from 'core/navigation';
import type { UserState } from 'core/user';
import type { MachineryState } from 'modules/machinery';
import type { LocalesState } from 'modules/otherlocales';

type Props = {
    entity: Entity;
    isReadOnlyEditor: boolean;
    locale: Locale;
    machinery: MachineryState;
    otherlocales: LocalesState;
    teamComments: TeamCommentState;
    terms: TermState;
    parameters: NavigationParams;
    user: UserState;
    commentTabRef: Record<string, any>;
    commentTabIndex: number;
    contactPerson: string;
    searchMachinery: (source: string) => void;
    addComment: (comment: string, id: number | null | undefined) => void;
    togglePinnedStatus: (status: boolean, id: number) => void;
    addTextToEditorTranslation: (text: string) => void;
    navigateToPath: (path: string) => void;
    setCommentTabIndex: (index: number) => void;
    resetContactPerson: () => void;
};

/**
 * Component showing details about an entity.
 *
 * Shows the metadata of the entity and an editor for translations.
 */
export default function Helpers(props: Props): React.ReactElement<any> {
    const {
        entity,
        isReadOnlyEditor,
        locale,
        machinery,
        otherlocales,
        teamComments,
        terms,
        parameters,
        user,
        commentTabRef,
        commentTabIndex,
        contactPerson,
        searchMachinery,
        addComment,
        togglePinnedStatus,
        addTextToEditorTranslation,
        navigateToPath,
        setCommentTabIndex,
        resetContactPerson,
    } = props;
    const dispatch = useAppDispatch();

    return (
        <>
            <div className='top'>
                <Tabs
                    selectedIndex={commentTabIndex}
                    onSelect={(tab) => setCommentTabIndex(tab)}
                >
                    <TabList>
                        {parameters.project === 'terminology' ? null : (
                            <Tab>
                                <Localized id='entitydetails-Helpers--terms'>
                                    {'TERMS'}
                                </Localized>
                                <TermCount terms={terms} />
                            </Tab>
                        )}
                        <Tab ref={commentTabRef}>
                            <Localized id='entitydetails-Helpers--comments'>
                                {'COMMENTS'}
                            </Localized>
                            <CommentCount teamComments={teamComments} />
                        </Tab>
                    </TabList>
                    {parameters.project === 'terminology' ? null : (
                        <TabPanel>
                            <Terms
                                isReadOnlyEditor={isReadOnlyEditor}
                                locale={locale.code}
                                terms={terms}
                                addTextToEditorTranslation={
                                    addTextToEditorTranslation
                                }
                                navigateToPath={navigateToPath}
                            />
                        </TabPanel>
                    )}
                    <TabPanel>
                        <TeamComments
                            parameters={parameters}
                            teamComments={teamComments}
                            user={user}
                            addComment={addComment}
                            togglePinnedStatus={togglePinnedStatus}
                            contactPerson={contactPerson}
                            resetContactPerson={resetContactPerson}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className='bottom'>
                <Tabs
                    onSelect={(index, lastIndex) => {
                        if (index === lastIndex) {
                            return false;
                        }
                        dispatch(editor.actions.selectHelperTabIndex(index));
                        dispatch(editor.actions.resetHelperElementIndex());
                    }}
                >
                    <TabList>
                        <Tab>
                            <Localized id='entitydetails-Helpers--machinery'>
                                {'MACHINERY'}
                            </Localized>
                            <MachineryCount machinery={machinery} />
                        </Tab>
                        <Tab>
                            <Localized id='entitydetails-Helpers--locales'>
                                {'LOCALES'}
                            </Localized>
                            <OtherLocalesCount otherlocales={otherlocales} />
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <Machinery
                            locale={locale}
                            machinery={machinery}
                            searchMachinery={searchMachinery}
                        />
                    </TabPanel>
                    <TabPanel>
                        <OtherLocales
                            entity={entity}
                            otherlocales={otherlocales}
                            user={user}
                            parameters={parameters}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}
