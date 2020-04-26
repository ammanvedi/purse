import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AccountType {
  Depository = 'DEPOSITORY'
}

export enum DayBasedFrequency {
  WeeklyOnce = 'WEEKLY_ONCE',
  Weekdays = 'WEEKDAYS',
  Weekends = 'WEEKENDS',
  EveryMonday = 'EVERY_MONDAY',
  EveryTuesday = 'EVERY_TUESDAY',
  EveryWednesday = 'EVERY_WEDNESDAY',
  EveryThursday = 'EVERY_THURSDAY',
  EveryFriday = 'EVERY_FRIDAY',
  EverySaturday = 'EVERY_SATURDAY',
  LastFridayOfMonth = 'LAST_FRIDAY_OF_MONTH'
}

export enum DateBasedFrequency {
  MonthlyOnce = 'MONTHLY_ONCE'
}

export type DayBasedFrequencyDescription = {
   __typename?: 'DayBasedFrequencyDescription';
  type: DayBasedFrequency;
};

export type DateBasedFrequencyDescription = {
   __typename?: 'DateBasedFrequencyDescription';
  type?: Maybe<DateBasedFrequency>;
  date: Scalars['Int'];
};

export type ExpenseFrequency = DayBasedFrequencyDescription | DateBasedFrequencyDescription;

export type DayBasedFrequencyDescriptionInput = {
  type: DayBasedFrequency;
};

export type DateBasedFrequencyDescriptionInput = {
  type?: Maybe<DateBasedFrequency>;
  date: Scalars['Int'];
};

export type AccountHolder = {
   __typename?: 'AccountHolder';
  id: Scalars['ID'];
  userName: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Category = {
   __typename?: 'Category';
  id: Scalars['ID'];
  description: Scalars['String'];
};

export type Account = {
   __typename?: 'Account';
  id: Scalars['ID'];
  balanceCurrent: Scalars['Float'];
  balanceAvailable: Scalars['Float'];
  name: Scalars['String'];
  type: AccountType;
  isoCurrency: Scalars['String'];
};

export type Transaction = {
   __typename?: 'Transaction';
  id: Scalars['ID'];
  amount: Scalars['Float'];
  utcTimestamp: Scalars['Int'];
  isoCurrency?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  pending: Scalars['Boolean'];
  account: Account;
  pendingTransaction?: Maybe<Transaction>;
  transferTransaction?: Maybe<Transaction>;
};

export type Expense = {
   __typename?: 'Expense';
  id: Scalars['ID'];
  frequency: ExpenseFrequency;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priceBoundLower: Scalars['Float'];
  priceBoundUpper: Scalars['Float'];
  utcTimestampCreated: Scalars['Int'];
  transactions: Array<Transaction>;
};

export type Forecast = {
   __typename?: 'Forecast';
  utcFrom: Scalars['Int'];
  utcTo: Scalars['Int'];
  expenses: Array<Expense>;
};

export type CreateExpenseInput = {
  dayFrequency?: Maybe<DayBasedFrequencyDescriptionInput>;
  dateFrequency?: Maybe<DateBasedFrequencyDescriptionInput>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priceBoundLower: Scalars['Float'];
  priceBoundUpper: Scalars['Float'];
  paused: Scalars['Boolean'];
};

export type UpdateExpenseInput = {
  id: Scalars['ID'];
  dayFrequency?: Maybe<DayBasedFrequencyDescriptionInput>;
  dateFrequency?: Maybe<DateBasedFrequencyDescriptionInput>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priceBoundLower: Scalars['Float'];
  priceBoundUpper: Scalars['Float'];
  paused: Scalars['Boolean'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createExpense?: Maybe<Forecast>;
  deleteExpense?: Maybe<Forecast>;
  updateExpense?: Maybe<Forecast>;
};


export type MutationCreateExpenseArgs = {
  expense?: Maybe<CreateExpenseInput>;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateExpenseArgs = {
  expense?: Maybe<UpdateExpenseInput>;
};

export type Query = {
   __typename?: 'Query';
  accounts: Array<Account>;
  forecast?: Maybe<Forecast>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AccountType: AccountType,
  DayBasedFrequency: DayBasedFrequency,
  DateBasedFrequency: DateBasedFrequency,
  DayBasedFrequencyDescription: ResolverTypeWrapper<DayBasedFrequencyDescription>,
  DateBasedFrequencyDescription: ResolverTypeWrapper<DateBasedFrequencyDescription>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ExpenseFrequency: ResolversTypes['DayBasedFrequencyDescription'] | ResolversTypes['DateBasedFrequencyDescription'],
  DayBasedFrequencyDescriptionInput: DayBasedFrequencyDescriptionInput,
  DateBasedFrequencyDescriptionInput: DateBasedFrequencyDescriptionInput,
  AccountHolder: ResolverTypeWrapper<AccountHolder>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Category: ResolverTypeWrapper<Category>,
  Account: ResolverTypeWrapper<Account>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Transaction: ResolverTypeWrapper<Transaction>,
  Expense: ResolverTypeWrapper<Omit<Expense, 'frequency'> & { frequency: ResolversTypes['ExpenseFrequency'] }>,
  Forecast: ResolverTypeWrapper<Forecast>,
  CreateExpenseInput: CreateExpenseInput,
  UpdateExpenseInput: UpdateExpenseInput,
  Mutation: ResolverTypeWrapper<{}>,
  Query: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  AccountType: AccountType,
  DayBasedFrequency: DayBasedFrequency,
  DateBasedFrequency: DateBasedFrequency,
  DayBasedFrequencyDescription: DayBasedFrequencyDescription,
  DateBasedFrequencyDescription: DateBasedFrequencyDescription,
  Int: Scalars['Int'],
  ExpenseFrequency: ResolversParentTypes['DayBasedFrequencyDescription'] | ResolversParentTypes['DateBasedFrequencyDescription'],
  DayBasedFrequencyDescriptionInput: DayBasedFrequencyDescriptionInput,
  DateBasedFrequencyDescriptionInput: DateBasedFrequencyDescriptionInput,
  AccountHolder: AccountHolder,
  ID: Scalars['ID'],
  Category: Category,
  Account: Account,
  Float: Scalars['Float'],
  Transaction: Transaction,
  Expense: Omit<Expense, 'frequency'> & { frequency: ResolversParentTypes['ExpenseFrequency'] },
  Forecast: Forecast,
  CreateExpenseInput: CreateExpenseInput,
  UpdateExpenseInput: UpdateExpenseInput,
  Mutation: {},
  Query: {},
};

export type DayBasedFrequencyDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DayBasedFrequencyDescription'] = ResolversParentTypes['DayBasedFrequencyDescription']> = {
  type?: Resolver<ResolversTypes['DayBasedFrequency'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DateBasedFrequencyDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DateBasedFrequencyDescription'] = ResolversParentTypes['DateBasedFrequencyDescription']> = {
  type?: Resolver<Maybe<ResolversTypes['DateBasedFrequency']>, ParentType, ContextType>,
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ExpenseFrequencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpenseFrequency'] = ResolversParentTypes['ExpenseFrequency']> = {
  __resolveType: TypeResolveFn<'DayBasedFrequencyDescription' | 'DateBasedFrequencyDescription', ParentType, ContextType>
};

export type AccountHolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountHolder'] = ResolversParentTypes['AccountHolder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  balanceCurrent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  balanceAvailable?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>,
  isoCurrency?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  utcTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isoCurrency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>,
  pending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>,
  pendingTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>,
  transferTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ExpenseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  frequency?: Resolver<ResolversTypes['ExpenseFrequency'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  priceBoundLower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  priceBoundUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  utcTimestampCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ForecastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Forecast'] = ResolversParentTypes['Forecast']> = {
  utcFrom?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  utcTo?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExpense?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, never>>,
  deleteExpense?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType, RequireFields<MutationDeleteExpenseArgs, 'id'>>,
  updateExpense?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType, RequireFields<MutationUpdateExpenseArgs, never>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>,
  forecast?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  DayBasedFrequencyDescription?: DayBasedFrequencyDescriptionResolvers<ContextType>,
  DateBasedFrequencyDescription?: DateBasedFrequencyDescriptionResolvers<ContextType>,
  ExpenseFrequency?: ExpenseFrequencyResolvers,
  AccountHolder?: AccountHolderResolvers<ContextType>,
  Category?: CategoryResolvers<ContextType>,
  Account?: AccountResolvers<ContextType>,
  Transaction?: TransactionResolvers<ContextType>,
  Expense?: ExpenseResolvers<ContextType>,
  Forecast?: ForecastResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
