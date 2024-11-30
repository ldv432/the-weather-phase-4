"""Fixed model relationships

Revision ID: e8f7e800b60f
Revises: b399c374ce4b
Create Date: 2024-11-29 18:56:20.730041

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8f7e800b60f'
down_revision = 'b399c374ce4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cities', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=40),
               existing_nullable=False)

    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_index('ix_favorites_user_id')
        batch_op.create_index(batch_op.f('ix_favorites_city_id'), ['city_id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_favorites_city_id'))
        batch_op.create_index('ix_favorites_user_id', ['user_id'], unique=False)

    with op.batch_alter_table('cities', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.String(length=40),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)

    # ### end Alembic commands ###
